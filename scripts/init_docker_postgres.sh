#!/bin/bash

if PGPASSWORD=password psql -U postgres -lqt | cut -d \| -f 1 | grep -qw poc_test; then
    DB_SCHEMA_LOCATION="/tmp/psql_data/"
    echo "*** CREATING DATABASE ***"
    psql -U postgres -d poc_test < "$DB_SCHEMA_LOCATION/tables.sql";
    echo "*** DATABASE CREATED! ***"

else
     echo "*** SKIPPING DATABASE CREATING, IT IS ALREADY EXIST! ***"
fi

