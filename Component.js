sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"custHeaderWidget/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("custHeaderWidget.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			jQuery.sap.setIcons({
				favicon: "/sap/fiori/headerwidget/css/ultafavicon.ico"
			});
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");///docservice/bridge/ulta/DirectoryList
		//	this.getModel().loadData("/authservice/bridge/ulta/DirectoryList?searchVal=Quad");
			var userModel = new sap.ui.model.json.JSONModel();
			userModel.loadData("../sap/fiori/headerwidget/services/userapi/currentUser");
			sap.ui.getCore().setModel(userModel, "userapi");
			
				var userModelAtt = new sap.ui.model.json.JSONModel();
			userModelAtt.loadData("../sap/fiori/headerwidget/services/userapi/attributes");
			sap.ui.getCore().setModel(userModelAtt, "userApiAttributes");

		}
	});
});