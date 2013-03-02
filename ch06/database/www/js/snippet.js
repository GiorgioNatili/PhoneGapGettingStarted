this.database.transaction(function(transactionObj){

  var sql = 'SELECT * FROM trips;';
  transactionObj.executeSql(sql, [], function(txObj, result){

    var limit = result.rows.length;

    for(i = 0; i < limit; i++){

      var obj = result.rows.item(i);
      console.log(obj.id + ' - ' + obj.tripper + '|' + obj.tripMate);
                    
    }

  }, null);

}, this.onTransactionFault, null); 
