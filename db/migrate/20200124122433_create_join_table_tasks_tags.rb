class CreateJoinTableTasksTags < ActiveRecord::Migration[6.0]
  def change
    create_join_table :tasks, :tags do |t|
      t.index :task_id
      t.index :tag_id
    end
  end
end
