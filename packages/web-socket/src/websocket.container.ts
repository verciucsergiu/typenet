import { Tree } from "@typenet/core/lib/routing/tree";
import { ClassDefinition } from "@typenet/core/lib/application/types/class-definition";
import { WebSocketHub } from "./decorators";

export interface HubSubscription {
    subs: HubSubscriptionMetadata[];
}

export interface HubSubscriptionMetadata {
    subscription: string;
    methodName: string;
}

export class WebSocketContainer {
    private static internalHubs: Tree<ClassDefinition> = {};
    private static internalSubscriptions: Tree<HubSubscription> = {};
    public static addHub(hub: ClassDefinition) {
        this.internalHubs[hub.name] = hub;
    }

    public static addSubscription(hub: ClassDefinition, methodName: string, subscription: string): void {
        if (!this.internalSubscriptions[hub.name]) {
            this.internalSubscriptions[hub.name] = { subs: [] };
        }

        this.internalSubscriptions[hub.name].subs.push({ methodName, subscription });
    }

    public static validate(): void {
        for (const hub in this.internalSubscriptions) {
            if (this.internalSubscriptions.hasOwnProperty(hub)) {
                const element = this.internalSubscriptions[hub];
                if (!this.internalHubs[hub]) {
                    throw new Error(`Wrong web sockets configuration! You have to decorate with @${WebSocketHub.name}() the "${hub}" class in order for subscriptions to work!`);
                }
            }
        }
    }

    public static get subscriptions(): Tree<HubSubscription> {
        return this.internalSubscriptions;
    }

    public static get hubs(): Tree<ClassDefinition> {
        return this.internalHubs;
    }
}