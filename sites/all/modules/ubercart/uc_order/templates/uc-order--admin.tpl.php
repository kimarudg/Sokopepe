<?php

/**
 * @file
 * This file is the default admin notification template for Ubercart.
 */
?>

<p>
<?php print t('Order number:'); ?> <?php print $order_admin_link; ?><br />
<?php print t('Customer:'); ?> <?php print $order_first_name; ?> <?php print $order_last_name; ?> - <?php print $order_email; ?><br />
<?php print t('Order total:'); ?> <?php print $order_total; ?><br />
<?php print t('Shipping method:'); ?> <?php print $order_shipping_method; ?>
</p>

<p>
<?php print t('Products:'); ?><br />
<?php foreach ($products as $product): ?>
- <?php print $product->qty; ?> x <?php print $product->title; ?> - <?php print $product->total_price; ?><br />
&nbsp;&nbsp;
<?php 
							$order_id = $product->order_id;
							$product_id = $product->order_product_id;
							
							  $sql = "SELECT name, up.weight as weight, weight_units as unit
									  FROM  `uc_order_products` up
									  JOIN  `field_data_field_packaging` fp ON fp.entity_id = up.nid
									  JOIN taxonomy_term_data td ON td.tid = fp.`field_packaging_tid` 
									  WHERE up.`order_id` = $order_id and order_product_id = $product_id";
									  $db_result = db_query($sql);
									  foreach ($db_result as $record) 
										{ 
										    $name = $record->name;
											$weight = $record->weight;
											$units = $record->unit;
											
										}
							  ?>


     <?php print $name.' of '.$weight.'/'.$units; ?>
<?php //print t('SKU'); print $product->model; ?><br />
    <?php if (!empty($product->data['attributes'])): ?>
    <?php foreach ($product->data['attributes'] as $attribute => $option): ?>
    &nbsp;&nbsp;<?php print t('@attribute: @options', array('@attribute' => $attribute, '@options' => implode(', ', (array)$option))); ?><br />
    <?php endforeach; ?>
    <?php endif; ?>
<br />
<?php endforeach; ?>
</p>

<p>
<?php print t('Order comments:'); ?><br />
<?php print $order_comments; ?>
</p>
