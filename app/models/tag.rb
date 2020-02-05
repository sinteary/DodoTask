class Tag < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  has_many :tasks, through: :labels

  
end
