require 'test_helper'

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_tasks_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_tasks_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_tasks_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_tasks_destroy_url
    assert_response :success
  end

end
