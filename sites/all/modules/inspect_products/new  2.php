<?php
function featured_product_form() {
	$query = "SELECT pi.product_inspectionid, pi.productid, i.inspection_name, 
			pi.inspectionID, pi.max_value, pi.min_value, pi.rec_value, pi.operator, n.nid, n.title 
			FROM product_inspection pi INNER JOIN node n ON n.nid = pi.productid  
			left outer join inspection i on pi.inspectionID = i.inspection_id";
	$rs = db_query($query);
 
	
	$status = array();
 
		foreach ($rs as $data)
		
		{
            $options[$data->product_inspectionid] = '';
 
            $form[$data->product_inspectionid]['inspection_name'] = array('#value' => stripslashes($data->inspection_name));
            $form[$data->product_inspectionid]['title'] = array('#value' => stripslashes($data->title));
            $form[$data->product_inspectionid]['operator'] = array('#value' => $data->operator . '%');
    
            
		}
	
 
	$form['featured'] = array(
		'#type' => 'checkboxes',
		'#options' => $options,
		'#default_value' => $status,
	);
 
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit'),
	);
 
	$form['cancel'] = array(
		'#type' => 'markup',
		'#value' => l(t('Cancel'), 'dashboard'),
	);
 
	$form['#redirect'] = 'featured_product_mgmt';
 
	return $form;
}




function theme_featured_product_form($form) {
	$rows = array();
	foreach (element_children($form) as $key) {
		$row = array();
		if (isset($form[$key]['name'])) {
 
			$status = drupal_render($form['featured'][$key]);
			$row[] = array('data' => $status, 'class' => 'checkbox');
 
			$row[] = ''. drupal_render($form[$key]['name']) .'';
			$row[] = array('data' => drupal_render($form[$key]['category']));
			$row[] = array('data' => drupal_render($form[$key]['discount']));
			$row[] = array('data' => drupal_render($form[$key]['createdon']));
 
			$rows[] = $row;
		}
	}
 
	// Individual table headers.
	$header = array();
	$header[] = array('data' => t('Featured'), 'class' => 'checkbox');
	$header[] = t('Name');
	$header[] = t('Category');
	$header[] = t('Discount');
	$header[] = t('Created on');
 
	$output = theme('table', $header, $rows);
	$output .= drupal_render($form);
	return $output;
}