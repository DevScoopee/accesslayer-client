import { Coins, Droplets, Key, Users, Vote, type LucideIcon } from 'lucide-react';

export type WalletBadgeType =
	| 'first-key'
	| 'staker'
	| 'liquidity-provider'
	| 'governance-voter'
	| 'referrer';

export type WalletBadge = {
	type: WalletBadgeType;
	earnedAt: string;
};

export type BadgeDefinition = {
	id: WalletBadgeType;
	name: string;
	criteria: string;
	icon: LucideIcon;
};

export type EarnedBadge = BadgeDefinition & { earnedAt: string };

export const BADGE_CATALOG: readonly BadgeDefinition[] = [
	{
		id: 'first-key',
		name: 'First Key',
		criteria: 'Buy your first creator key',
		icon: Key,
	},
	{
		id: 'staker',
		name: 'Staker',
		criteria: 'Stake creator keys to earn rewards',
		icon: Coins,
	},
	{
		id: 'liquidity-provider',
		name: 'Liquidity Provider',
		criteria: 'Add liquidity to a creator key pool',
		icon: Droplets,
	},
	{
		id: 'governance-voter',
		name: 'Governance Voter',
		criteria: 'Cast a vote on a governance proposal',
		icon: Vote,
	},
	{
		id: 'referrer',
		name: 'Referrer',
		criteria: 'Refer a wallet that completes its first trade',
		icon: Users,
	},
];

/**
 * Splits the catalog into earned and locked badges. Earned badges keep catalog
 * order, are de-duplicated, and unknown API badge types are ignored.
 */
export function splitBadges(badges: readonly WalletBadge[]): {
	earned: EarnedBadge[];
	locked: BadgeDefinition[];
} {
	const earnedAtByType = new Map<WalletBadgeType, string>();
	for (const badge of badges) {
		if (!earnedAtByType.has(badge.type)) {
			earnedAtByType.set(badge.type, badge.earnedAt);
		}
	}

	const earned: EarnedBadge[] = [];
	const locked: BadgeDefinition[] = [];
	for (const definition of BADGE_CATALOG) {
		const earnedAt = earnedAtByType.get(definition.id);
		if (earnedAt !== undefined) {
			earned.push({ ...definition, earnedAt });
		} else {
			locked.push(definition);
		}
	}

	return { earned, locked };
}
