class Tag < ApplicationRecord
  validates :name, presence: true
  has_many :labels
  has_many :tasks, through: :labels
  belongs_to :user

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => {
            :tasks => {}
          })
  end
end
