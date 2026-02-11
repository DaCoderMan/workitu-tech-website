import { getDb } from '@/lib/firebase-admin';
import {
  StorageAdapter,
  Entitlement,
  EntitlementStatus,
  WebhookEvent,
} from '../billing.types';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

export class FirestoreStorageAdapter implements StorageAdapter {
  private get db() {
    return getDb();
  }

  private get entitlements() {
    return this.db.collection('entitlements');
  }

  private get processedWebhooks() {
    return this.db.collection('processed_webhooks');
  }

  private get webhookEvents() {
    return this.db.collection('webhook_events');
  }

  async upsertEntitlement(data: {
    userId: string;
    entitlementKey: string;
    status: EntitlementStatus;
    sourceProvider: string;
    sourceId: string;
    sourceType: 'order' | 'subscription';
    startsAt: Date;
    expiresAt: Date | null;
    metaJson?: Record<string, any>;
  }): Promise<Entitlement> {
    const docId = `${data.userId}_${data.entitlementKey}_${data.sourceId}`;
    const docRef = this.entitlements.doc(docId);
    const now = new Date();

    const record = {
      userId: data.userId,
      entitlementKey: data.entitlementKey,
      status: data.status,
      sourceProvider: data.sourceProvider,
      sourceId: data.sourceId,
      sourceType: data.sourceType,
      startsAt: Timestamp.fromDate(data.startsAt),
      expiresAt: data.expiresAt ? Timestamp.fromDate(data.expiresAt) : null,
      metaJson: data.metaJson || null,
      updatedAt: Timestamp.fromDate(now),
    };

    const result = await this.db.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      if (snap.exists) {
        tx.update(docRef, record);
        return { ...snap.data()!, ...record, createdAt: snap.data()!.createdAt };
      } else {
        const fullRecord = { ...record, createdAt: Timestamp.fromDate(now) };
        tx.set(docRef, fullRecord);
        return fullRecord;
      }
    });

    return this.mapEntitlement(docId, result);
  }

  async revokeEntitlement(params: {
    userId: string;
    entitlementKey: string;
    sourceId: string;
  }): Promise<void> {
    const docId = `${params.userId}_${params.entitlementKey}_${params.sourceId}`;
    await this.entitlements.doc(docId).update({
      status: 'expired',
      updatedAt: Timestamp.fromDate(new Date()),
    });
  }

  async listUserEntitlements(userId: string): Promise<Entitlement[]> {
    const snapshot = await this.entitlements
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map((doc) => this.mapEntitlement(doc.id, doc.data()));
  }

  async hasActiveEntitlement(userId: string, entitlementKey: string): Promise<boolean> {
    const snapshot = await this.entitlements
      .where('userId', '==', userId)
      .where('entitlementKey', '==', entitlementKey)
      .where('status', '==', 'active')
      .get();

    if (snapshot.empty) return false;

    const now = new Date();
    return snapshot.docs.some((doc) => {
      const data = doc.data();
      if (!data.expiresAt) return true;
      const expiresAt = (data.expiresAt as Timestamp).toDate();
      return expiresAt > now;
    });
  }

  async getEntitlementBySourceId(
    sourceId: string,
    sourceProvider: string
  ): Promise<Entitlement | null> {
    const snapshot = await this.entitlements
      .where('sourceId', '==', sourceId)
      .where('sourceProvider', '==', sourceProvider)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return this.mapEntitlement(doc.id, doc.data());
  }

  async markWebhookProcessed(eventKey: string, payload?: any): Promise<void> {
    await this.processedWebhooks.doc(eventKey).set({
      eventKey,
      payload: payload || null,
      processedAt: Timestamp.fromDate(new Date()),
    });
  }

  async isWebhookProcessed(eventKey: string): Promise<boolean> {
    const doc = await this.processedWebhooks.doc(eventKey).get();
    return doc.exists;
  }

  async logWebhookEvent(event: WebhookEvent): Promise<void> {
    await this.webhookEvents.add({
      id: event.id,
      provider: event.provider,
      eventType: event.eventType,
      payload: event.payload,
      signature: event.signature || null,
      processedAt: event.processedAt ? Timestamp.fromDate(event.processedAt) : null,
      createdAt: Timestamp.fromDate(event.createdAt),
    });
  }

  private mapEntitlement(docId: string, data: any): Entitlement {
    return {
      id: docId,
      userId: data.userId,
      entitlementKey: data.entitlementKey,
      status: data.status as EntitlementStatus,
      sourceProvider: data.sourceProvider,
      sourceId: data.sourceId,
      sourceType: data.sourceType,
      startsAt: data.startsAt instanceof Timestamp
        ? data.startsAt.toDate()
        : new Date(data.startsAt),
      expiresAt: data.expiresAt
        ? (data.expiresAt instanceof Timestamp
            ? data.expiresAt.toDate()
            : new Date(data.expiresAt))
        : null,
      metaJson: data.metaJson || undefined,
      createdAt: data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate()
        : new Date(data.updatedAt),
    };
  }
}
