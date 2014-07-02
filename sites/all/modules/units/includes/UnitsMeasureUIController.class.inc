<?php

/**
 * Admin UI controller class for entity type 'units_measure'.
 */
class UnitsMeasureUIController extends EntityDefaultUIController {

  protected function overviewTableHeaders($conditions, $rows, $additional_header = array()) {
    // Adding extra column for managing units of this measure.
    $additional_header[] = t('Units');
    $additional_header[] = t('Re-import');
    return parent::overviewTableHeaders($conditions, $rows, $additional_header);
  }

  protected function overviewTableRow($conditions, $id, $entity, $additional_cols = array()) {
    // Adding extra cell for managing units of this measure.
    $additional_cols[] = l('manage units', 'admin/structure/units-measure/' . $entity->measure . '/units-unit');
    if ($entity->isReimportable()) {
      $additional_cols[] = l(t('Re-import from !module module', array('!module' => $entity->module)), 'units-ui/re-import/units-measure/' . field_extract_bundle('units_unit', $entity), array('query' => drupal_get_destination()));
    }
    else {
      $additional_cols[] = t('Not Available');
    }
    return parent::overviewTableRow($conditions, $id, $entity, $additional_cols);
  }

}
