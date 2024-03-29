<?php

/**
 * Implements example command.
 */
class Redirection_Cli extends WP_CLI_Command {
	private function get_group( $group_id ) {
		if ( $group_id === 0 ) {
			$groups = Red_Group::get_filtered( array() );

			if ( count( $groups['items'] ) > 0 ) {
				return $groups['items'][ 0 ]['id'];
			}
		} else {
			$groups = Red_Group::get( $group_id );
			if ( $groups ) {
				return $group_id;
			}
		}

		return false;
	}

	/**
	 * Import redirections from a JSON, CSV, or .htaccess file
	 *
	 * ## OPTIONS
	 *
	 * <file>
	 * : The name of the file to import.
	 *
	 * [--group=<groupid>]
	 * : The group ID to import into. Defaults to the first available group. JSON
	 *   contains it's own group
	 *
	 * [--format=<importformat>]
	 * : The import format - csv, htaccess, or json. Defaults to json
	 *
	 * ## EXAMPLES
	 *
	 *     wp redirection import .htaccess --format=htaccess
	 */
	public function import( $args, $extra ) {
		$format = isset( $extra['format'] ) ? $extra['format'] : 'json';
		$group = $this->get_group( isset( $extra['group'] ) ? intval( $extra['group'], 10 ) : 0 );

		if ( ! $group ) {
			WP_CLI::error( 'Invalid group' );
			return;
		}

		$importer = Red_FileIO::create( $format );

		if ( ! $importer ) {
			WP_CLI::error( 'Invalid import format - csv, json, or htaccess supported' );
			return;
		}

		if ( $format === 'csv' ) {
			$file = fopen( $args[0], 'r' );

			if ( $file ) {
				$count = $importer->load( $group, $args[0], '' );
				WP_CLI::success( 'Imported ' . $count . ' as ' . $format );
			} else {
				WP_CLI::error( 'Invalid import file' );
			}
		} else {
			$data = @file_get_contents( $args[0] );

			if ( $data ) {
				$count = $importer->load( $group, $args[0], $data );
				WP_CLI::success( 'Imported ' . $count . ' redirects as ' . $format );
			} else {
				WP_CLI::error( 'Invalid import file' );
			}
		}
	}

	/**
	 * Export redirections to a CSV, JSON, .htaccess, or rewrite.rules file
	 *
	 * ## OPTIONS
	 *
	 * <module>
	 * : The module to export - wordpress, apache, nginx, or all
	 *
	 * <filename>
	 * : The file to export to, or - for stdout
	 *
	 * [--format=<exportformat>]
	 * : The export format. One of json, csv, apache, or nginx. Defaults to json
	 *
	 * ## EXAMPLES
	 *
	 *     wp redirection export wordpress --format=apache
	 */
	public function export( $args, $extra ) {
		$format = isset( $extra['format'] ) ? $extra['format'] : 'json';
		$exporter = Red_FileIO::create( $format );

		if ( ! $exporter ) {
			WP_CLI::error( 'Invalid export format - json, csv, htaccess, or nginx supported' );
			return;
		}

		$file = fopen( $args[1] === '-' ? 'php://stdout' : $args[1], 'w' );
		if ( $file ) {
			$export = Red_FileIO::export( $args[0], $format );

			if ( $export === false ) {
				WP_CLI::error( 'Invalid module - must be wordpress, apache, nginx, or all' );
				return;
			}

			fwrite( $file, $export['data'] );
			fclose( $file );

			WP_CLI::success( 'Exported ' . $export['total'] . ' to ' . $format );
		} else {
			WP_CLI::error( 'Invalid output file' );
		}
	}

	/**
	 * Perform Redirection database actions
	 *
	 * ## OPTIONS
	 *
	 * <action>
	 * : The database action to perform: install, remove, upgrade
	 *
	 * ## EXAMPLES
	 *
	 *     wp redirection database install
	 */
	public function database( $args, $extra ) {
		$action = false;

		if ( count( $args ) === 0 || ! in_array( $args[0], array( 'install', 'remove', 'upgrade' ), true ) ) {
			WP_CLI::error( 'Invalid database action - please use install, remove, or upgrade' );
			return;
		}

		if ( $args[0] === 'install' ) {
			Red_Database::apply_to_sites( function() {
				$latest = Red_Database::get_latest_database();
				$latest->install();
			} );

			WP_CLI::success( 'Database installed' );
		} elseif ( $args[0] === 'upgrade' ) {
			Red_Database::apply_to_sites( function() {
				$database = new Red_Database();
				$status = new Red_Database_Status();

				if ( ! $status->needs_updating() ) {
					WP_CLI::success( 'Database is already the latest version' );
					return;
				}

				$loop = 0;

				while ( $loop < 50 ) {
					$result = $database->apply_upgrade( $status );
					$info = $status->get_json();

					if ( ! $info['inProgress'] ) {
						break;
					}

					if ( $info['status'] === 'error' ) {
						WP_CLI::error( 'Database failed to upgrade: ' . $info['reason'] );
						return;
					}

					$loop++;
				}
			} );

			WP_CLI::success( 'Database upgraded' );
		} elseif ( $args[0] === 'remove' ) {
			Red_Database::apply_to_sites( function() {
				$latest = Red_Database::get_latest_database();
				$latest->remove();
			} );

			WP_CLI::success( 'Database removed' );
		}
	}
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'redirection import', array( 'Redirection_Cli', 'import' ) );
	WP_CLI::add_command( 'redirection export', array( 'Redirection_Cli', 'export' ) );
	WP_CLI::add_command( 'redirection database', array( 'Redirection_Cli', 'database' ) );

	add_action( Red_Flusher::DELETE_HOOK, function() {
		$flusher = new Red_Flusher();
		$flusher->flush();
	} );
}
