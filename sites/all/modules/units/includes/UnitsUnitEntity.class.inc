<?php

/**
 * Entity class for entity type 'units_unit'.
 */
class UnitsUnitEntity extends Entity {

  /**
   * In what module this entity has been created.
   *
   * @var string
   */
  public $module;

  protected function setUp() {
    parent::setUp();
    $units_info = units_info();
    // Bundle is the key in $units_info array. If such key exists, then this
    // measure was imported from a module, otherwise it was created via
    // units_ui module.
    try {
      $bundle = entity_extract_ids('units_unit', $this);
      $bundle = $bundle[2];
    }
    catch (EntityMalformedException $e) {
      // Exception may be thrown when entity is being added, since bundle
      // property does not actually exist yet.
      // We initialize $bundle with any value that we are sure won't be found
      // in $units_info.
      $bundle = 'units_ui.module';
    }

    $this->module = isset($this->machine_name) && isset($units_info[$bundle]['units'][$this->machine_name]) ? $units_info[$bundle]['units'][$this->machine_name]['module'] : 'units_ui';
  }

  /**
   * Whether this entity can be re-imported (re-set) from units_info() data.
   *
   * @return bool
   */
  public function isReimportable() {
    return $this->module != 'units_ui';
  }
}
