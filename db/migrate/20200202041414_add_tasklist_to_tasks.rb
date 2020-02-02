class AddTasklistToTasks < ActiveRecord::Migration[6.0]
  def change
    add_reference :tasks, :tasklist, foreign_key: true
  end
end
