<?php

/**
 * @file
 * Documentation for Units module.
 */

/**
 * Hook to introduce units defined in your module.
 *
 * This hook is designed to introduce to Units module various units and measures
 * defined in other modules.
 *
 * @return array
 *   Array of units and measures. Each key of array represents machine-readable
 *   name of measure, while keys of the sub array are the following:
 *     label - human readable name of measure
 *     description - (defaults to '') human readable description of measure
 *     units - array of units in which this measure can be measured (see below)
 *     convert_callback - (defaults to UNITS_DEFAULT_CONVERT_CALLBACK) a PHP
 *       function that handles conversion of units inside of this measure
 *   Each key of array of units should represent machine-readable name of unit,
 *   while keys of the sub array are the following:
 *     label - human readable name of unit
 *     description - (defaults to '') human readable description of unit
 *     factor - a constant factor multiplying by which value from this unit
 *       will be converted to the SI unit of this measure or any standard unit
 *       for this measure. Note: based on this parameter the default convert
 *       callback function does its convertions.
 */
function hook_units_info() {
  return array(
    'length' => array(
      'label' => 'Length',
      'description' => 'bla bla bla',
      'units' => array(
        'meter' => array(
          'label' => 'Meter',
          'factor' => 1,
          'description' => 'Meter',
        ),
        'centimeter' => array(
          'label' => 'Centimeter',
          'factor' => 0.01,
          'description' => 'Centimeter',
        ),
      ),
    ),
    'dummy' => array(
      'label' => 'Dummy Length',
      'description' => 'There is a russian movie where a curious parrot asks himself how long is boa, measuring in parrots. According to him, one boa is 38 parrots long.',
      'units' => array(
        'parrot' => array(
          'label' => 'Parrot',
          'factor' => 1,
          'description' => 'A parrot unit',
        ),
        'boa' => array(
          'label' => 'boa',
          'factor' => 38,
          'description' => 'A boa unit',
        ),
      ),
    ),
    'random' => array(
      'label' => 'Random Converter',
      'description' => 'A test group of units. Do not try to find out dependency in factors between units of this group. The result of a conversion in this group is always a random number.',
      'units' => array(
        'a' => array(
          'label' => 'Unit Measure 1',
          'description' => 'Unit #1',
        ),
        'b' => array(
          'label' => 'Unit Measure 2',
          'description' => 'Unit #2',
        ),
      ),
      'convert_callback' => 'units_convert_random',
    ),
  );
}

/**
 * Dummy convert callback.
 *
 * Convert value measured in one unit into value measured in another unit.
 *
 * @param float $value
 *   Value to be converted
 * @param string $from
 *   Machine name of source units measure
 * @param string $to
 *   Machine name of destination units measure
 * @param string $measure
 *   Optional. Measure of value to be converted, normally the measure is looked
 *   up using the provided $form and $to, but in case the same unit measure is
 *   used in different measures, this parameter may narrow down unit measures
 *   to the necessary scope.
 *
 * @return float
 *   Value, converted from $from units into $to units
 */
function units_convert_random($value, $from, $to, $measure = NULL) {
  // Normally we would load $from and $to and do some manipulations with it.
  // But in our case, result is just a random number.

  return rand();
}
