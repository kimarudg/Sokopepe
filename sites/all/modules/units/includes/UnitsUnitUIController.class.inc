<?php

/**
 * Admin UI controller class for entity type 'units_unit'.
 */
class UnitsUnitUIController extends EntityDefaultUIController {

  public function __construct($entity_type, $entity_info) {
    // We have to override %units_measure_machine_name placeholder in
    // $this->path with real bundle.
    parent::__construct($entity_type, $entity_info);
    $this->path = str_replace('%units_measure_machine_name', $this->bundleArgument(), $this->path);
  }

  public function hook_menu() {
    // For this particular case we need to undo substitution of [bundle] to the
    // real bundle string made in __construct method of this class.
    $original_path = $this->path;
    $this->path = $this->entityInfo['admin ui']['path'];
    $items = parent::hook_menu();
    // We have to alter title for general overview page of entity admin UI,
    // to make it less confusing we need to include title of measure into it.
    $items[$this->path]['title callback'] = 'units_ui_unit_title';
    $items[$this->path]['title arguments'] = array($this->bundleArgumentPosition());
    // Putting back the original path once we are done.
    $this->path = $original_path;
    return $items;
  }

  public function overviewTable($conditions = array()) {
    // For better code reusage we prefer to add a condition and pass on to
    // parent's method, rather than running our own EntityFieldQuery and then
    // building the overview table.
    $conditions[$this->entityInfo['entity keys']['bundle']] = $this->bundleArgument();
    return parent::overviewTable($conditions);
  }

  protected function overviewTableHeaders($conditions, $rows, $additional_header = array()) {
    // Adding extra column for reimporting.
    $additional_header[] = t('Re-import');
    return parent::overviewTableHeaders($conditions, $rows, $additional_header);
  }

  protected function overviewTableRow($conditions, $id, $entity, $additional_cols = array()) {
    // Adding 'Re-import' column.
    if ($entity->isReimportable()) {
      $additional_cols[] = l(t('Re-import from !module module', array('!module' => $entity->module)), 'units-ui/re-import/units-unit/' . $entity->machine_name . '/' . field_extract_bundle('units_unit', $entity), array('query' => drupal_get_destination()));
    }
    else {
      $additional_cols[] = t('Not Available');
    }
    return parent::overviewTableRow($conditions, $id, $entity, $additional_cols);
  }

  /**
   * Supportive function.
   *
   * Based on entity info extracts menu argument position of bundle.
   */
  protected function bundleArgumentPosition() {
    // We have defined a custom property 'path bundle argument position' in
    // hook_entity_info(), of which we now take advantage.
    return $this->entityInfo['admin ui']['path bundle argument position'];
  }

  /**
   * Supportive function.
   *
   * Extracts bundle argument from menu path.
   */
  public function bundleArgument() {
    return arg($this->bundleArgumentPosition());
  }

  public function entityFormSubmitBuildEntity($form, &$form_state) {
    // Before we handle on down the way to parent's method, we have to insert
    // the info about bundle into $form_state.
    $form_state['values'][$this->entityInfo['entity keys']['bundle']] = $this->bundleArgument();
    return parent::entityFormSubmitBuildEntity($form, $form_state);
  }

}
