class Task < ApplicationRecord
  belongs_to :tasklist
  has_many :labels
  has_many :tags, through: :labels
  
  validates :name, presence: true

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
    #when user marks a task done: only the "done" attribute is needed for edit method
    if tagslist===(["MARK000"])
      return
    end

    #delete tags which the user removed (if any)
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
