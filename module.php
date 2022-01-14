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


	public function getOrderById($Id) {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Id, EffectiveDate, BillToContact.Name, Status, OrderNumber, TotalAmount FROM Order WHERE Id = '$Id'");

		$records = $results->getRecords();
	
		return $records;
	}


	public function getOrderItems($Id) {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id' Order By ExpirationDate__c DESC");

		$records = $results->getRecords();
	
		return $records;
	}


	public function getContacts() {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Name, Id FROM Contact");

		$records = $results->getRecords();
		
		return $records[0];
	}


	public function jsonContactListFunction($eventId) {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Product2.Name, Contact__r.Ocdla_Current_Member_Flag__c, Order.EffectiveDate, Contact__r.Name, Contact__r.MailingState, Contact__r.MailingCity FROM OrderItem WHERE OrderItem.Product2.Event__c = '$eventId'");

		$records = $results->getRecords();
		
		return $records;
    }


	public function getJsonListEntries($id) {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$id'");

		$records = $results->getRecords();
	
		return $records[0];
	}


	public function orderUpdate($id = null) {

		$api = $this->loadForceApi();

		$req = $this->getRequest();
		$body = $req->getBody();
		$Id = $body->Id;
		//get body method
		//var_dump($Id);
		return $body;
		/*
		$record = new stdClass();

		//will need to get all these records by using the js id to search for the values?
		//check if it has a js id then
		$record->OrderId=$id; //the order id
		$record->Id=null;//"8028D000000MBZfQAO"; //if its a new order item //8028D000000MBZfQAO
		//$record->ContactName="Elijah R.L. Brown";
		//$record->Product2Name="CLE Archive: 2015 House Bill 2320 (Package)";
		$record->Contact__c="0030a00001V0uTWAAZ";
		//$record->Product2Id="01t0a000004Ov6bAAC";
		$record->Description="";
		$record->Note_1__c="";
		$record->Note_2__c="";
		$record->Note_3__c="";
		//$record->ExpirationDate__c=null;
		$record->UnitPrice=0;
		$record->Quantity=1;
		//$record->TotalPrice=0;
		$record->PricebookEntryId="01u0a00000Hb0AgAAJ";
		
		$result = $api->upsert("OrderItem", $record);

		return $result;*/
	}


	public function orderDelete($id) {

		$api = $this->loadForceApi();

		$record = new stdClass();
		
		$result = $api->delete("OrderItem", $id);

		var_dump($result);
		exit;
		return $result;
	}

}

