<?php 




class ExampleModule extends Module {

    public function __construct(){
        parent::__construct();

        $this->name = "example";
    }





    public function theCallback() {
			$tpl = new Template("default");
			$tpl->addPath(__DIR__ . "/templates");

			$html = $tpl;

			return $tpl;
    }



    public function getJsonList() {
			$api = $this->loadForceApi();

			$results = $api->query("SELECT Name, Id, Start_Date__c, Banner_Location_Text__c FROM Event__c ORDER BY Start_Date__c DESC");

			$records = $results->getRecords();
		
			return $records;
    }




	public function getJsonDetails($id) {
			$api = $this->loadForceApi();

			$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$id'");

			$records = $results->getRecords();
		
			return $records[0];
	}


}

