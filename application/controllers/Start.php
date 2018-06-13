<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Start extends CI_Controller {

	public function message() 
	{
		echo "Hola mundo".PHP_EOL;
	}

	public function index()	{
		$data['title'] = 'Nuestro contenido';

		$this->layout->view("index_view", $data);
	}

}
