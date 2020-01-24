class TagController < ApplicationController
  def index
  end

  def show
  end

  def create
    tag = Tag.create!(tag_params)
    if tag
      render json: tag
    else
      render json: tag.errors
    end
  end

  private
  def tag_params
    params.permit(:name)
  end

  def destroy
  end

end
