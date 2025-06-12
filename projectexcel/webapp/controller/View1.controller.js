sap.ui.define([
    "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "projectexcel/libs/xlsx" // Adjust this path based on your app ID
], (Controller, JSONModel, XLSX) => {
    "use strict";

    return Controller.extend("projectexcel.controller.View1", {
      onInit: function () {},

    onUpload: function (oEvent) {
      var file = oEvent.getParameter("files")[0];
      if (!file) {
        sap.m.MessageToast.show("No file selected!");
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, { type: "binary" });
        var firstSheet = workbook.SheetNames[0];
        var sheetData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        var oModel = new sap.ui.model.json.JSONModel(sheetData);
        this.getView().byId("idTable").setModel(oModel, "excel");
      }.bind(this);

      reader.readAsBinaryString(file);
    }
      //   onInit: function () {
      //       this.getView().setModel(new JSONModel([]), "excel");
      //     },
       
      //     onUpload: function (oEvent) {
      //       var file = oEvent.getParameter("files")[0];
      //       if (file && window.FileReader) {
      //         var reader = new FileReader();
      //         reader.onload = function (e) {
      // var data = e.target.result;
      // var workbook = XLSX.read(data, { type: "binary" });
      //           var sheetName = workbook.SheetNames[0];
      //           var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      //           this.getView().getModel("excel").setData(jsonData);
      //         }.bind(this);
      //         reader.readAsBinaryString(file);
      //       }
      //     }
    });
});