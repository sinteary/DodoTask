class AddDateTimeToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :duedate, :datetime
  end
end
