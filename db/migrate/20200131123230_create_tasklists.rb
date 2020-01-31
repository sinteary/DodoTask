class CreateTasklists < ActiveRecord::Migration[6.0]
  def change
    create_table :tasklists do |t|
      t.string :name

      t.timestamps
    end
  end
end
