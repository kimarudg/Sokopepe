<?php
function order_allocation_views_data() {
 // ----------------------------------------------------------------
 // order_allocation_forecast table

 // Define the base group of this table. Fields that don't
 // have a group defined will go into this field by default.
 $data['order_allocation_table']['table']['group']  = t('Allocation');
 $data['order_allocation']['table']['base'] = array(
   'field' => 'date',
   'title' => t('OrderAllocation'),
   'help' => t('Order Allocation'),
 );

 //event start
 $data['order_allocation_table']['id'] = array(
   'title' => t('Id'),
   'help' => t("Unique ID of allocation"), // The help that appears on the UI,
   'field' => array(
     'handler' => 'views_handler_field_numeric',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_numeric',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_numeric',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort',
   ),
 );

 $data['order_allocation_table']['productid'] = array(
   'title' => t('ProductID'),
   'help' => t("ProductID for the product"), // The help that appears on the UI,
   'field' => array(
     'handler' => 'views_handler_field_numeric',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_numeric',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_numeric',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort',
   ),
 );
 
  $data['order_allocation_table']['uid'] = array(
   'title' => t('UserID'),
   'help' => t("UserID of the user/seller assigned the allocation"), // The help that appears on the UI,
   'field' => array(
     'handler' => 'views_handler_field_numeric',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_numeric',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_numeric',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort',
   ),
 );
 
  $data['order_allocation_table']['qty'] = array(
   'title' => t('Quantity'),
   'help' => t("Quantity Allocated"), // The help that appears on the UI,
   'field' => array(
     'handler' => 'views_handler_field_numeric',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_numeric',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_numeric',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort',
   ),
 );
 
  $data['order_allocation_table']['supplied'] = array(
   'title' => t('Supplied'),
   'help' => t("Whether the user has supplied the quantity or not"), // The help that appears on the UI,
   'field' => array(
     'handler' => 'views_handler_field_numeric',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_numeric',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_numeric',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort',
   ),
 );
 
 $data['myweather_forecast']['date_created'] = array(
   'title' => t('Date'),
   'help' => t('Date of the forecast'),
   'field' => array(
     'handler' => 'views_handler_field',
   ),
   'argument' => array(
     'handler' => 'views_handler_argument_string',
   ),
   'filter' => array(
     'handler' => 'views_handler_filter_string',
   ),
   'sort' => array(
     'handler' => 'views_handler_sort_string',
   ),
 );

  
 

 return $data;
}