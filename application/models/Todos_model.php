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

    public function update_task($task) {
        $this->db->query("UPDATE todo SET todo_title=?, todo_comment=?, todo_done=? WHERE todo_id=?;", 
                         array(
                             'todo_title' => $task['title'],
                             'todo_comment' => $task['comment'],
                             'todo_dome' => $task['status'],
                             'todo_id' => $task['id']
                         ));

        return $this->db->affected_rows();
    }
}