class Task < ApplicationRecord
    validates :name, presence: true
    belongs_to :tasklist
    has_many :labels
    has_many :tags, through: :labels

    def as_json(options={})
        super(:except => [:created_at, :updated_at],
              :include => {
                :tags => {:only => [:name]}
              })
    end
    
    def create_tags(tagslist, user_id)
      tagslist.each do |name|
        new_tag = Tag.find_or_create_by(name: name, user_id: user_id);
        if(!self.tags.include?new_tag)
          self.tags << new_tag
        end
      end
    end

    def update_tags(tagslist, user_id)
      if tagslist===(["MARK000"])
        return
      end

      self.tags.each do |tag|
        if !tagslist.include?tag.name
          self.tags.delete(tag)
        end
      end

      tagslist.each do |name|
        #if tag does not exist
        if (!self.tags.exists?(name: name, user_id: user_id))
          new_tag = Tag.find_or_create_by(name: name, user_id: user_id)
          self.tags << new_tag
        end
      end
    end
end
