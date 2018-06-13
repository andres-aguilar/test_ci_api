<?php 
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Todos_model extends CI_Model
{
    public function load_all_tasks() 
    {
        $query = $this->db->get('todo');

        return $query->result_array();
    }

    public function register_task($task) {}

    public function update_task($task) {}
}
