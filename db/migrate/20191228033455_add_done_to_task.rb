class AddDoneToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :done, :boolean
  end
end
