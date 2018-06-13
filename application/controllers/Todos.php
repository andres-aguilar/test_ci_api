<?php 
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Todos extends CI_Controller
{

	private $messages = array(
		'error' => array('message' => 'error'),
    	'ok' => array('message' => 'OK')
	);

    private function message($msg)
    {
        /* Return a JSON message

            Params
            $msg : Array with a message to encode as a JSON response
        */
        $this->output->set_content_type('application/json')
            		 ->set_output(json_encode($msg));
	}

    public function index()
    {
        $data['title'] = 'TODO';
        $this->load->view('Todos/todo_view', $data);
    }

    public function getAllTasks() 
    {
        $this->load->model("Todos_model");
        $tasks = $this->Todos_model->load_all_tasks();

        $this->message($tasks);
    }

    public function registerTask()
    {
        if ($this->input->post()) {
            $id      = $this->input->post("id", true);
            $title   = $this->input->post("title", true);
            $comment = $this->input->post("comment", true);

            // Register
            $this->message($this->messages['ok']);
        } else {
            $this->message($this->massages['error']);
        }
    }

    public function updateTask() 
    {
        if ($this->input->post()) {
            $id      = $this->input->post("id", true);
            $title   = $this->input->post("title", true);
            $comment = $this->input->post("comment", true);
            $status  = $this->input->post("status", true);

            // Update

            $this->message($this->messages['ok']);
        } else {
            $this->message($this->massages['error']);
        }
    }
}
