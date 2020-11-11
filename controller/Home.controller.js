sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var thisModel, that;
	return Controller.extend("custHeaderWidget.controller.Home", {
		onInit: function() {
			thisModel = this.getOwnerComponent().getModel();
			that = this;
		},

		onAfterRendering: function() {
			//	var userModel = new sap.ui.model.json.JSONModel("services/userapi/currentUser");
			//	this.getView().setModel(userModel, "userapi");
			var oUserModel = new sap.ushell.Container.getService("UserInfo");
			var oNameModel = this.getOwnerComponent().getModel("oNameModel");
			oNameModel.setProperty("/FullName", oUserModel.getUser().getFullName());
		},

		fnSearchButtonPress: function(oEvent) {
			var searchStr = oEvent.getSource().getValue();
			if (searchStr !== "") {
				/*jQuery.ajax({
				url : "/authservice/bridge/ulta/DirectoryList?searchVal=" + searchStr ,
				async : true,	//We need user information before loading the application, hence synchronous call
				method : "GET",
				dataType : 'json',
				success : function(oData) {
					thisModel.loadData(oData);
									},
				error: function(oError){
					jQuery.sap.log.error(oError); 
				}
			});  */
				//this.getOwnerComponent().getModel().loadData("../sap/fiori/headerwidget/authservice/bridge/ulta/DirectoryList?searchVal=Quad");
				var oModel = new sap.ui.model.json.JSONModel();
				jQuery.ajax({
					method: "GET",
					url: "../sap/fiori/headerwidget/authservice/bridge/ulta/DirectoryList?searchVal=" + searchStr,
					dataType: "json",
					crossDomain: true,
					async: false,
					success: function(data, textStatus, jqXHR) {
						thisModel.setData(data);
						if (!that._oPopoverSearch) {
							that._oPopoverSearch = sap.ui.xmlfragment("custHeaderWidget.view.searchResults", that);
							that.getView().addDependent(that._oPopoverSearch);
						}
						that._oPopoverSearch.openBy(oEvent.getSource());
						/*oModel.setData({
							modelData: data
						});*/
						/*alert("success to post");*/
					},
					error: function(oError) {
						jQuery.sap.log.error(oError);
					}
				});
				//	this.getOwnerComponent().getModel().loadData("/authservice/bridge/ulta/DirectoryList?searchVal=" + searchStr);
			}
		},

		onLogoutPress: function() {
			sap.ushell.Container.logout();
			setTimeout(function() {
				sap.ushell.Container.logout();
			}, 500);
		}
	});
});