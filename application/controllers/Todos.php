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

    private function JSONresponse($msg)
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

        $this->JSONresponse($tasks);
    }

    public function registerTask()
    {
        if ($this->input->post()) {
            $id      = $this->input->post("id", true);
            $title   = $this->input->post("title", true);
            $comment = $this->input->post("comment", true);

            if ($id != null && $title != null && $comment != null) {
                $task = array('id'=>$id, 'title'=>$title, 'comment'=>$comment);
    
                // Register
                $this->load->model("Todos_model");
                if ($this->Todos_model->register_task($task) == 1) {
                    $this->JSONresponse($this->messages['ok']);
                } else {
                    $this->JSONresponse($this->messages['error']);    
                }
            } else {
                $this->JSONresponse($this->messages['error']); 
            }
        } else {
            $this->JSONresponse($this->messages['error']);
        }
    }

    public function updateTask() 
    {
        if ($this->input->post()) {
            $id      = $this->input->post("id", true);
            $title   = $this->input->post("title", true);
            $comment = $this->input->post("comment", true);
            $status  = $this->input->post("status", true);

            if ($id != null && $title != null && $comment != null && $status != null) {
                $status = ($status == "true") ? 1 : 0;
                $task = array('id'=>$id, 'title'=>$title, 'comment'=>$comment, 'status'=>$status);
                
                $this->load->model("Todos_model");
                // Update
                if ($this->Todos_model->update_task($task) == 1) {
                    $this->JSONresponse($this->messages['ok']);
                } else {
                    $this->JSONresponse($this->messages['error']);    
                }
            }
            $this->JSONresponse($this->messages['ok']);
        } else {
            $this->JSONresponse($this->messages['error']);
        }
    }
}
