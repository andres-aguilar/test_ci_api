<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_todo extends CI_Migration {

	public function up()
	{
		$this->dbforge->add_field(array(
			'todo_id' => array(
				'type' => 'VARCHAR',
				'constraint' => '100'
			),
			'todo_title' => array(
				'type' => 'VARCHAR',
				'constraint' => '100'
			),
			'todo_comment' => array(
				'type' => 'TEXT',
				'null' => TRUE
            ),
            'todo_done' => array(
                'type' => 'boolean',
                'default' => FALSE,
                'null' => FALSE
            )
		));

        $this->dbforge->add_key('todo_id', TRUE);
		$this->dbforge->create_table('todo');
	}

	public function down()
	{
		$this->dbforge->drop_table('todo');
    }
}