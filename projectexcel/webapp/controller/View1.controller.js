sap.ui.define([
    "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("projectexcel.controller.View1", {
        onInit: function () {
            this.getView().setModel(new JSONModel([]), "excel");
          },
       
          onUpload: function (oEvent) {
            var file = oEvent.getParameter("files")[0];
            if (file && window.FileReader) {
              var reader = new FileReader();
              reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, { type: "binary" });
                var sheetName = workbook.SheetNames[0];
                var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                this.getView().getModel("excel").setData(jsonData);
              }.bind(this);
              reader.readAsBinaryString(file);
            }
          }
    });
});