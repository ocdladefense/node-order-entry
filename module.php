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

		$results = $api->query("SELECT Id, Product2Id, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id'");

		$records = $results->getRecords();
	
		return $records;
}




	public function getJsonListEntries($id) {
			$api = $this->loadForceApi();

			$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$id'");

			$records = $results->getRecords();
		
			return $records[0];
	}


}

