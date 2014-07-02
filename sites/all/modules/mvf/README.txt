
-- SUMMARY --

Measured Value Field provides a new field type. This field type consists of 2
subfields:
* value (numeric value of something - this part is outsourced to Number module)
* unit (units in which the given value is measured - this part is outsourced to
Entity Rereference module)
Then in formatters of this field type you can specify in what units you want to
render entered value (this part is outsourced to Units module). Joining these
powerful modules allows to introduce Measured Value Field.

-- REQUIREMENTS --

The Units module requires the following modules:
* Units
* Entity Reference
* Number

-- INSTALLATION --

Install as usual. After installation you will have additional field types
available to be attached to any other entity (nodes, taxonomy terms, etc.).

-- CONFIGURATION --

The module itself does not provide any configuration as of the moment.
