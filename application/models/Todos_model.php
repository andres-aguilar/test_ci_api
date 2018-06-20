<?php 
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Todos_model extends CI_Model
{
    public function load_all_tasks() 
    {
        $query = $this->db->query('SELECT * FROM todo WHERE todo_done=0');

        return $query->result_array();
    }

    public function register_task($task) {
        $this->db->query("INSERT INTO todo(todo_id, todo_title, todo_comment) VALUES(?, ?, ?)", $task);

        return $this->db->affected_rows();
    }
}