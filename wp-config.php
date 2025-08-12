<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'sktc4sefianm_kientrucnoithat3df' );

/** Database username */
define( 'DB_USER', 'sktc4sefianm_kientrucnoithat3df' );

/** Database password */
define( 'DB_PASSWORD', 'Sangh@12345' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'T*1U5Y6C37*6SkT!C0cwu%66HxD#[VsN*7*[O~5*BKY60h)Zu%0v:TC3mbSqv%6r');
define('SECURE_AUTH_KEY', '4*;!1lP]&%T(L((]Bm~h0B!v+HZ)162th+#Pue[l_0670%8JB:7v-_e2:oj+5t!7');
define('LOGGED_IN_KEY', 'ki|q:ib+4-*T@/6&I56x8qI@Nj072*44(eRBT~a1~32J|Ng_yr65*nD5kN8Kf174');
define('NONCE_KEY', '5U&4zVFfVa!c93(%)kPx;96#eJ~9W4;gsr|b_5(R10y5k*/C4GZK7/R-HCr1]7x*');
define('AUTH_SALT', '2/~B#(A3DCO0v-]HymoVbI!J+&cy5[K7*3V[P|d-][3YQPLO!Gx9_[fkf4I*y;2d');
define('SECURE_AUTH_SALT', '96yX_i!TY]2naJ*%bKz4j]4Phi(0i:(a5J42Ivo]sfxf!x9jpSw8935pnXgt)tbf');
define('LOGGED_IN_SALT', 'C0y]msO9w](EKle653J|*8H4]nU9U+4m@50F!02+FHt6-V|98n~J343VwYzc)&_a');
define('NONCE_SALT', '4xdyOBJ7b1tz8H9b(FN#57_8x*7c6&SJ0)7wU@q7tt43Zh6zdUu]r6%o7xa(19wk');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'bz_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_DEBUG_DISPLAY', false );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
