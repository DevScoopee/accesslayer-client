import { Settings } from 'lucide-react';
import { useProfileStore } from '@/hooks/useProfileStore';
import { useSessions } from '@/hooks/useSessions';
import { useNavigationTiming } from '@/hooks/useNavigationTiming';
import SessionSecuritySection from '@/components/settings/SessionSecuritySection';

/**
 * Account settings page (#1111).
 *
 * Currently hosts the session security dashboard. Additional account
 * sections can be added here as the settings surface grows.
 */
export default function AccountSettingsPage() {
	useNavigationTiming('account-settings');

	const profile = useProfileStore(state => state.profile);
	const userId = profile?.id ?? '';

	const {
		sessions,
		isLoading,
		isError,
		isRevoking,
		revokeSession,
		revokeAllOtherSessions,
	} = useSessions(userId);

	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<div className="mb-8 flex items-center gap-3">
				<Settings className="size-6 text-foreground" aria-hidden="true" />
				<h1 className="font-jakarta text-2xl font-semibold">
					Account settings
				</h1>
			</div>

			<SessionSecuritySection
				sessions={sessions}
				isLoading={isLoading}
				isError={isError}
				isRevoking={isRevoking}
				onRevokeSession={revokeSession}
				onRevokeAllOtherSessions={revokeAllOtherSessions}
			/>
		</main>
	);
}
