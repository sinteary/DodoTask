class Tag < ApplicationRecord
  has_many :labels
  has_many :tasks, through: :labels
  belongs_to :user
  
  validates :name, presence: true

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => {
            :tasks => {
              :include => {
                :tags => {}
              }
            }
          })
  end
end
