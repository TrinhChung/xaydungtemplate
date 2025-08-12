<?php
// Add custom Theme Functions here

//xoa mã bưu điện thanh toán
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
function custom_override_checkout_fields( $fields ) {
     unset($fields['billing']['billing_postcode']);
     unset($fields['billing']['billing_country']);
     unset($fields['billing']['billing_address_2']);
     unset($fields['billing']['billing_company']);
     
    
     return $fields;
}
// Add our custom product cat rewrite rules
function devvn_product_category_rewrite_rules($flash = false) {
    $terms = get_terms( array(
        'taxonomy' => 'product_cat',
        'post_type' => 'product',
        'hide_empty' => false,
    ));
    if($terms && !is_wp_error($terms)){
        $siteurl = esc_url(home_url('/'));
        foreach ($terms as $term){
            $term_slug = $term->slug;
            $baseterm = str_replace($siteurl,'',get_term_link($term->term_id,'product_cat'));
            add_rewrite_rule($baseterm.'?$','index.php?product_cat='.$term_slug,'top');
            add_rewrite_rule($baseterm.'page/([0-9]{1,})/?$', 'index.php?product_cat='.$term_slug.'&paged=$matches[1]','top');
            add_rewrite_rule($baseterm.'(?:feed/)?(feed|rdf|rss|rss2|atom)/?$', 'index.php?product_cat='.$term_slug.'&feed=$matches[1]','top');
        }
    }
    if ($flash == true)
        flush_rewrite_rules(false);
}
add_action('init', 'devvn_product_category_rewrite_rules');

/**
 * LightSlider Scripts
 */
function ls_scripts_styles() {
    wp_enqueue_style( 'lightslidercss', get_stylesheet_directory_uri(). '/css/lightslider.min.css' , array(), '1.0.0', 'all' );
    wp_enqueue_script( 'lightsliderjs', get_stylesheet_directory_uri() . '/js/lightslider.min.js', array( 'jquery' ), '1.0.0', true );
    wp_enqueue_script( 'lightsliderinit', get_stylesheet_directory_uri() . '/js/lightslider-init.js', array( 'lightsliderjs' ), '1.0.0', true );
}

add_action( 'woocommerce_single_product_summary', 'gia_tien', 10  );
function gia_tien(){
    $giatri=get_field('gia_tri');
    ?>
<div class="giatien">
    <p>Giá từ:<span class="gia-tien"> <?php echo $giatri;?></span></p>
</div>
  
    <?php
}
add_action( 'flatsome_custom_single_product_1', 'thong_tin_bo_sung', 17  );
function thong_tin_bo_sung(){
    $titletongquan=get_field('title_tong_quan');
    $imgtongquan = get_field('album_tong_quan');
    $vitri=get_field('vi_tri');
    $titlevitri=get_field('title_vi_tri');
    $tienich=get_field('tien_ich');
    $titletienich=get_field('title_tien_ich');
    $imgtienich=get_field('album_tien_ich');
    $noithat=get_field('noi_that');
     $imgnoithat=get_field('album_noi_that');
    $titlenoithat=get_field('title_noi_that');
    $tiendo=get_field('tien_do');
    $titletiendo=get_field('title_tien_do');
    $matbang=get_field('mat_bang');
    $titlematbang=get_field('title_mat_bang');
$imgmatbang=get_field('album_mat_bang');
    $titleuudai=get_field('title_uu_dai');
    global $product;


  ?>
  <div class="div-mo-ta">
     <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #tong-quan" data-bullet="false" data-link="#tong-quan" data-title="Change this"><a name="vi-tri"></a></span> </div>
        
      <div class="div-tong-quan">
        <h2 class="h2-mo-ta">
            <?php if (isset($titletongquan)&& $titletongquan != ""){
                echo $titletongquan;
            }else{
              echo "Tổng quan dự án";}?>
        </h2>
     
          <?php  echo apply_filters( 'the_content', get_post_field('post_content', $product_id) ); ?>
            <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #vi-tri" data-bullet="false" data-link="#vi-tri" data-title="Change this"><a name="vi-tri"></a></span> </div>
      </div>
        
      <div class="div-vi-tri">
           <h2 class="h2-mo-ta">
            <?php if (isset($titlevitri)&& $titlevitri != ""){
                echo $titlevitri;
            }else{
              echo "Vị trí dự án";}?>
        </h2>
          <?php echo $vitri;?>
           <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #tien-ich" data-bullet="false" data-link="#tien-ich" data-title="Change this"><a name="tien-ich"></a></span> </div>
      </div>
         
         <div class="div-tien_ich">
           <h2 class="h2-mo-ta">
            <?php if (isset($titletienich)&& $titletienich != ""){
                echo $titletienich;
            }else{
              echo "Tiện ích dự án";}?>
        </h2>
          <?php echo $tienich;
            if( $imgtienich ): ?>

        <ul id="light-slider" class="image-gallery">
        
        <?php foreach( $imgtienich as $image ): ?>
        
            <li data-thumb="<?php echo $image['url']; ?>">
                <a href=""><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" /></a>
            </li>

        <?php endforeach; ?>
        </ul>
    <?php endif; ?>
      <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #noi-that" data-bullet="false" data-link="#noi-that" data-title="Change this"><a name="noi-that"></a></span> </div>
      </div>
     
         <div class="div-tien_ich">
           <h2 class="h2-mo-ta">
            <?php if (isset($titlenoithat)&& $titletnoithat != ""){
                echo $titletnoithat;
            }else{
              echo "Nội thất dự án";}?>
        </h2>
          <?php echo $noithat;
            if( !empty($imgnoithat)  ){ ?>

        <ul id="light-slider" class="image-gallery">
        
        <?php foreach( $imgnoithat as $image ): ?>
        
            <li data-thumb="<?php echo $image['url']; ?>">
                <a href=""><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" /></a>
            </li>

        <?php endforeach; ?>
        </ul>
    <?php } ?>
      <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #tien-do" data-bullet="false" data-link="#tien-do" data-title="Change this"><a name="tien-do"></a></span> </div>
      </div>
     
         <div class="div-tien_ich">
           <h2 class="h2-mo-ta">
            <?php if (isset($titletiendo)&& $titletiendo != ""){
                echo $titletiendo;
            }else{
              echo "Tiến độ thanh toán";}?>
        </h2>
          <?php echo $tiendo;
           ?>
                <div class="nut-scroll"> <span class="scroll-to" data-label="Scroll to: #mat-bang" data-bullet="false" data-link="#mat-bang" data-title="Change this"><a name="mat-bang"></a></span> </div>
      </div>
   
         <div class="div-tien_ich">
           <h2 class="h2-mo-ta">
            <?php if (isset($titlematbang)&& $titlematbang != ""){
                echo $titlematbang;
            }else{
              echo "Mặt bằng";}?>
        </h2>
          <?php echo $matbang;
             if( !empty($imgmatbang) ){ ?>

        <ul id="light-slider" class="image-gallery">
        
        <?php foreach( $imgmatbang as $image ): ?>
        
            <li data-thumb="<?php echo $image['url']; ?>">
                <a href=""><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" /></a>
            </li>

        <?php endforeach; ?>
        </ul>
    <?php } 

           ?>
      </div>
  </div>

<?php

}

add_action('woocommerce_shop_loop_item_title','thong_tin_gia');
function thong_tin_gia(){
    $giatri=get_field('gia_tri');
    ?>
<div class="giatien">
    <p>Giá từ:<span class="gia-tien"> <?php echo $giatri;?></span></p>
</div>
  
    <?php
}
function the_dramatist_custom_login_css() {
    echo '<style type="text/css">.login h1:after{content:"Thi\1EBF t k\1EBF  website nhanh ch\00F3 ng, chuy\00EA n nghi\1EC7 p";font-size:16px;font-weight:normal;text-align:center}body #login{width:calc(100% - 30px);width:-webkit-calc(100% - 30px);width:-moz-calc(100% - 30px);width:-ms-calc(100% - 30px);width:-o-calc(100% - 30px);max-width:420px;background:#fff;padding:29px 24px 16px 24px!important;box-shadow:0 0 2rem 0 rgba(136,152,170,.15);border-radius:.375rem}body #login form{width:100%;margin:0 auto;box-shadow:none!important;border:0!important;padding:0!important}body #login .message{width:100%;margin-left:auto;margin-right:auto;box-shadow:none!important;color:#155724;background-color:#d4edda;border:1px solid #c3e6cb!important;border-radius:3px}body.login{display:flex;flex-direction:column;justify-content:center;align-items:center}body.login *{box-sizing:border-box}.login #backtoblog,.login #nav{padding:0!important}.login form .input,.login form input[type=checkbox],.login input[type=text]{background:#fff!important;font-size:16px;padding:0 12px;border:1px solid #DCE1E7;box-shadow:none!important}.login form .input:focus,.login form input[type=checkbox]:focus,.login input[type=text]:focus{border-color:#4DA6E8}.login #wp-submit{box-shadow: none !important;padding:2px 20px;background:#4DA6E8;background:linear-gradient(to right,#00d4fd,#338aff);background-image:linear-gradient(135deg,#03cffd 10%,#0396FF 100%);background-size:200% auto;border:0;outline:none!important}.login #wp-submit:hover{background-size:125% auto}.login #backtoblog a:hover,.login #nav a:hover{color:#4DA6E8}.login h1{margin-bottom:15px}.login h1 a{background-image:url('.str_replace("http://","",get_home_url()).'/logo.png)!important;width:150px!important;height:41px!important;background-size:150px 41px!important;margin-bottom:10px!important}</style>';
}
add_action('login_head', 'the_dramatist_custom_login_css');
// Thay doi duong dan logo admin
function wpc_url_login(){
return get_home_url(); // duong dan vao website cua ban
}
add_filter('login_headerurl', 'wpc_url_login');
//Tùy chỉnh admin footer
function custom_admin_footer() { 
 echo 'Thiết kế bởi <a href="https://bizhostvn.com/" target="blank">Bizhostvn.com</a>';}
 add_filter('admin_footer_text', 'custom_admin_footer');
//Xóa logo wordpress
add_action( 'admin_bar_menu', 'remove_wp_logo', 999 );

function remove_wp_logo( $wp_admin_bar ) {
    $wp_admin_bar->remove_node( 'wp-logo' );
}
// hide update notifications
function remove_core_updates(){
global $wp_version;return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
}
add_filter('pre_site_transient_update_core','remove_core_updates'); //hide updates for WordPress itself
add_filter('pre_site_transient_update_plugins','remove_core_updates'); //hide updates for all plugins
add_filter('pre_site_transient_update_themes','remove_core_updates'); //hide updates for all themes