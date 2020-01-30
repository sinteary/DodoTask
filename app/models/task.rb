class Task < ApplicationRecord
    validates :name, presence: true
    has_many :labels
    has_many :tags, through: :labels

    def create_tags(tagslist)
      tagslist.each do |name|
        new_tag = Tag.create(name: name);
        self.tags << new_tag
      end
    end
end
