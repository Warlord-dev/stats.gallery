import { NearClient } from '@/services/near/NearClient';
import { Network } from '@/services/near/networks';
import {
  NEAR_ACCOUNT,
  NEAR_ACCOUNT_URL,
  NEAR_CLIENT,
  NEAR_NETWORK,
} from '@/services/provideNear';
import Big from 'big.js';
import { DateTime } from 'luxon';
import { inject, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { isString } from './is';

const yocto = new Big('1e+24');

export function toNear(value?: string | number | Big): Big {
  const bn = new Big(value ?? 0);
  return bn.div(yocto);
}

export const nearSymbol = String.fromCharCode(9411); // Ⓝ

export function nearContext(): {
  account: Ref<string>;
  exists: Ref<boolean>;
  network: Ref<Network>;
  client: NearClient;
} {
  // TODO: Fallback?
  // eslint-disable-next-line
  const account = inject<Ref<string>>(NEAR_ACCOUNT)!;
  // eslint-disable-next-line
  const exists = inject<Ref<boolean>>(NEAR_ACCOUNT_URL)!;
  // eslint-disable-next-line
  const network = inject<Ref<Network>>(NEAR_NETWORK)!;
  // eslint-disable-next-line
  const client = inject<NearClient>(NEAR_CLIENT)!;

  return {
    account,
    exists,
    network,
    client,
  };
}

export function nearTimestampToLocaleString(
  timestamp: number,
  format?: Intl.DateTimeFormatOptions,
): string {
  return DateTime.fromMillis(timestamp / 1000000).toLocaleString(format);
}

export function nearTimestampToISO(timestamp: number): string {
  return DateTime.fromMillis(timestamp / 1000000).toISO();
}
