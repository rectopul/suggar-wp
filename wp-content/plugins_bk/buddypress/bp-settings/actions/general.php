<?php
/**
 * Settings: Email address and password action handler
 *
 * @package BuddyPress
 * @subpackage SettingsActions
 * @since 3.0.0
 */

/**
 * Handles the changing and saving of user email addresses and passwords.
 *
 * We do quite a bit of logic and error handling here to make sure that users
 * do not accidentally lock themselves out of their accounts. We also try to
 * provide as accurate of feedback as possible without exposing anyone else's
 * information to them.
 *
 * Special considerations are made for super admins that are able to edit any
 * users accounts already, without knowing their existing password.
 *
 * @since 1.6.0
 *
 * @global BuddyPress $bp
 */
function bp_settings_action_general() {
	if ( ! bp_is_post_request() ) {
		return;
	}

	// Bail if no submit action.
	if ( ! isset( $_POST['submit'] ) ) {
		return;
	}

	// Bail if not in settings.
	if ( ! bp_is_settings_component() || ! bp_is_current_action( 'general' ) ) {
		return;
	}

	// 404 if there are any additional action variables attached
	if ( bp_action_variables() ) {
		bp_do_404();
		return;
	}

	// Define local defaults
	$bp            = buddypress(); // The instance
	$email_error   = false;        // invalid|blocked|taken|empty|nochange
	$pass_error    = false;        // invalid|mismatch|empty|nochange
	$pass_changed  = false;        // true if the user changes their password
	$email_changed = false;        // true if the user changes their email
	$feedback_type = 'error';      // success|error
	$feedback      = array();      // array of strings for feedback.

	// Nonce check.
	check_admin_referer('bp_settings_general');

	// Validate the user again for the current password when making a big change.
	if ( ( is_super_admin() ) || ( !empty( $_POST['pwd'] ) && wp_check_password( $_POST['pwd'], $bp->displayed_user->userdata->user_pass, bp_displayed_user_id() ) ) ) {

		$update_user = get_userdata( bp_displayed_user_id() );

		/* Email Change Attempt ******************************************/

		if ( !empty( $_POST['email'] ) ) {

			// What is missing from the profile page vs signup -
			// let's double check the goodies.
			$user_email     = sanitize_email( esc_html( trim( $_POST['email'] ) ) );
			$old_user_email = $bp->displayed_user->userdata->user_email;

			// User is changing email address.
			if ( $old_user_email != $user_email ) {

				// Run some tests on the email address.
				$email_checks = bp_core_validate_email_address( $user_email );

				if ( true !== $email_checks ) {
					if ( isset( $email_checks['invalid'] ) ) {
						$email_error = 'invalid';
					}

					if ( isset( $email_checks['domain_banned'] ) || isset( $email_checks['domain_not_allowed'] ) ) {
						$email_error = 'blocked';
					}

					if ( isset( $email_checks['in_use'] ) ) {
						$email_error = 'taken';
					}
				}

				// Store a hash to enable email validation.
				if ( false === $email_error ) {
					$hash = wp_generate_password( 32, false );

					$pending_email = array(
						'hash'     => $hash,
						'newemail' => $user_email,
					);

					bp_update_user_meta( bp_displayed_user_id(), 'pending_email_change', $pending_email );
					$verify_link = bp_displayed_user_domain() . bp_get_settings_slug() . '/?verify_email_change=' . $hash;

					// Send the verification email.
					$args = array(
						'tokens' => array(
							'displayname'    => bp_core_get_user_displayname( bp_displayed_user_id() ),
							'old-user.email' => $old_user_email,
							'user.email'     => $user_email,
							'verify.url'     => esc_url( $verify_link ),
						),
					);
					bp_send_email( 'settings-verify-email-change', bp_displayed_user_id(), $args );

					// We mark that the change has taken place so as to ensure a
					// success message, even though verification is still required.
					$_POST['email'] = $update_user->user_email;
					$email_changed = true;
				}

			// No change.
			} else {
				$email_error = false;
			}

		// Email address cannot be empty.
		} else {
			$email_error = 'empty';
		}

		/* Password Change Attempt ***************************************/

		if ( !empty( $_POST['pass1'] ) && !empty( $_POST['pass2'] ) ) {

			if ( ( $_POST['pass1'] == $_POST['pass2'] ) && !strpos( " " . wp_unslash( $_POST['pass1'] ), "\\" ) ) {

				// Password change attempt is successful.
				if ( ( ! empty( $_POST['pwd'] ) && $_POST['pwd'] != $_POST['pass1'] ) || is_super_admin() )  {
					$update_user->user_pass = $_POST['pass1'];
					$pass_changed = true;

				// The new password is the same as the current password.
				} else {
					$pass_error = 'same';
				}

			// Password change attempt was unsuccessful.
			} else {
				$pass_error = 'mismatch';
			}

		// Both password fields were empty.
		} elseif ( empty( $_POST['pass1'] ) && empty( $_POST['pass2'] ) ) {
			$pass_error = false;

		// One of the password boxes was left empty.
		} elseif ( ( empty( $_POST['pass1'] ) && !empty( $_POST['pass2'] ) ) || ( !empty( $_POST['pass1'] ) && empty( $_POST['pass2'] ) ) ) {
			$pass_error = 'empty';
		}

		// The structure of the $update_user object changed in WP 3.3, but
		// wp_update_user() still expects the old format.
		if ( isset( $update_user->data ) && is_object( $update_user->data ) ) {
			$update_user = $update_user->data;
			$update_user = get_object_vars( $update_user );

			// Unset the password field to prevent it from emptying out the
			// user's user_pass field in the database.
			// @see wp_update_user().
			if ( false === $pass_changed ) {
				unset( $update_user['user_pass'] );
			}
		}

		// Clear cached data, so that the changed settings take effect
		// on the current page load.
		if ( ( false === $email_error ) && ( false === $pass_error ) && ( wp_update_user( $update_user ) ) ) {
			$bp->displayed_user->userdata = bp_core_get_core_userdata( bp_displayed_user_id() );
		}

	// Password Error.
	} else {
		$pass_error = 'invalid';
	}

	// Email feedback.
	switch ( $email_error ) {
		case 'invalid' :
			$feedback['email_invalid']  = __( 'That email address is invalid. Check the formatting and try again.', 'buddypress' );
			break;
		case 'blocked' :
			$feedback['email_blocked']  = __( 'That email address is currently unavailable for use.', 'buddypress' );
			break;
		case 'taken' :
			$feedback['email_taken']    = __( 'That email address is already taken.', 'buddypress' );
			break;
		case 'empty' :
			$feedback['email_empty']    = __( 'Email address cannot be empty.', 'buddypress' );
			break;
		case false :
			// No change.
			break;
	}

	// Password feedback.
	switch ( $pass_error ) {
		case 'invalid' :
			$feedback['pass_error']    = __( 'Your current password is invalid.', 'buddypress' );
			break;
		case 'mismatch' :
			$feedback['pass_mismatch'] = __( 'The new password fields did not match.', 'buddypress' );
			break;
		case 'empty' :
			$feedback['pass_empty']    = __( 'One of the password fields was empty.', 'buddypress' );
			break;
		case 'same' :
			$feedback['pass_same'] 	   = __( 'The new password must be different from the current password.', 'buddypress' );
			break;
		case false :
			// No change.
			break;
	}

	// No errors so show a simple success message.
	if ( ( ( false === $email_error ) || ( false == $pass_error ) ) && ( ( true === $pass_changed ) || ( true === $email_changed ) ) ) {
		$feedback[]    = __( 'Your settings have been saved.', 'buddypress' );
		$feedback_type = 'success';

	// Some kind of errors occurred.
	} elseif ( ( ( false === $email_error ) || ( false === $pass_error ) ) && ( ( false === $pass_changed ) || ( false === $email_changed ) ) ) {
		if ( bp_is_my_profile() ) {
			$feedback['nochange'] = __( 'No changes were made to your account.', 'buddypress' );
		} else {
			$feedback['nochange'] = __( 'No changes were made to this account.', 'buddypress' );
		}
	}

	// Set the feedback.
	bp_core_add_message( implode( "\n", $feedback ), $feedback_type );

	/**
	 * Fires after the general settings have been saved, and before redirect.
	 *
	 * @since 1.5.0
	 */
	do_action( 'bp_core_general_settings_after_save' );

	// Redirect to prevent issues with browser back button.
	bp_core_redirect( trailingslashit( bp_displayed_user_domain() . bp_get_settings_slug() . '/general' ) );
}
add_action( 'bp_actions', 'bp_settings_action_general' );

/**
 * Process email change verification or cancel requests.
 *
 * @since 2.1.0
 */
function bp_settings_verify_email_change() {
	if ( ! bp_is_settings_component() ) {
		return;
	}

	if ( ! bp_is_my_profile() ) {
		return;
	}

	$redirect_to = trailingslashit( bp_displayed_user_domain() . bp_get_settings_slug() );

	// Email change is being verified.
	if ( isset( $_GET['verify_email_change'] ) ) {
		$pending_email = bp_get_user_meta( bp_displayed_user_id(), 'pending_email_change', true );

		// Bail if the hash provided doesn't match the one saved in the database.
		if ( ! hash_equals( urldecode( $_GET['verify_email_change'] ), $pending_email['hash'] ) ) {
			return;
		}

		$email_changed = wp_update_user( array(
			'ID'         => bp_displayed_user_id(),
			'user_email' => trim( $pending_email['newemail'] ),
		) );

		if ( $email_changed ) {

			// Delete the pending email change key.
			bp_delete_user_meta( bp_displayed_user_id(), 'pending_email_change' );

			// Post a success message and redirect.
			bp_core_add_message( __( 'You have successfully verified your new email address.', 'buddypress' ) );
		} else {
			// Unknown error.
			bp_core_add_message( __( 'There was a problem verifying your new email address. Please try again.', 'buddypress' ), 'error' );
		}

		bp_core_redirect( $redirect_to );
		die();

	// Email change is being dismissed.
	} elseif ( ! empty( $_GET['dismiss_email_change'] ) ) {
		$nonce_check = isset( $_GET['_wpnonce'] ) && wp_verify_nonce( wp_unslash( $_GET['_wpnonce'] ), 'bp_dismiss_email_change' );

		if ( $nonce_check ) {
			bp_delete_user_meta( bp_displayed_user_id(), 'pending_email_change' );
			bp_core_add_message( __( 'You have successfully dismissed your pending email change.', 'buddypress' ) );
		}

		bp_core_redirect( $redirect_to );
		die();
	}
}
add_action( 'bp_actions', 'bp_settings_verify_email_change' );
