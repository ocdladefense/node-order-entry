<?php 




class ExampleModule extends Module {

    public function __construct(){
        parent::__construct();

        $this->name = "example";
    }





    public function home() {
			$tpl = new Template("default");
			$tpl->addPath(__DIR__ . "/templates");

			$html = $tpl;

			return $tpl;
    }



    public function getOrders() {
			$api = $this->loadForceApi();

			$results = $api->query("SELECT Id, EffectiveDate, BillToContact.Name, Status, OrderNumber, TotalAmount FROM Order Order By EffectiveDate DESC LIMIT 25");

			$records = $results->getRecords();
		
			return $records;
    }

	public function getSingleOrder($Id) {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Id, EffectiveDate, BillToContact.Name, Status, OrderNumber, TotalAmount FROM Order  WHERE Id = '$Id'");

		$records = $results->getRecords();
	
		return $records;
}

	public function getOrderItems($Id) {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id'");

		$records = $results->getRecords();
	
		return $records;
}

	/*public function getContact() {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Contact__r.Name, Id FROM Event__c WHERE Id = '$eventId'");

		$records = $results->getRecords();
		
		return $records[0];
	}

	public function jsonContactListFunction($eventId) {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Product2.Name, Contact__r.Ocdla_Current_Member_Flag__c, Order.EffectiveDate, Contact__r.Name, Contact__r.MailingState, Contact__r.MailingCity FROM OrderItem WHERE OrderItem.Product2.Event__c = '$eventId'");

		$records = $results->getRecords();
		
		return $records;
    }*/




	public function getJsonListEntries($id) {
			$api = $this->loadForceApi();

			$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$id'");

			$records = $results->getRecords();
		
			return $records[0];
	}


}

