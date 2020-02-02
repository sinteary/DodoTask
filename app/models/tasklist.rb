class Tasklist < ApplicationRecord
  has_many :tasks

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => { 
            :tasks => { :include => {
              :tags => {}
            }}
          })
  end

end
