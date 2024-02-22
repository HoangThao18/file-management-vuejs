<template>
  <div id="layout-wrapper">
    <the-header></the-header>
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0 font-size-18">File Manager</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">Apps</a>
                    </li>
                    <li class="breadcrumb-item active">File Manager</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title -->

          <div class="d-xl-flex">
            <div class="w-100">
              <div class="d-md-flex">
                <!-- filemanager-leftsidebar -->
                <the-left-side-bar></the-left-side-bar>

                <the-main-content :isShareView="true"> </the-main-content>
                <!-- end w-100 -->
              </div>
            </div>
          </div>
          <!-- end row -->
        </div>
        <!-- container-fluid -->
      </div>
    </div>
    <!-- end main content-->
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheLeftSideBar from "@/components/TheLeftSideBar.vue";
import TheMainContent from "@/components/TheMainContent.vue";
import { provide } from "vue";
export default {
  name: "HomeView",
  components: { TheHeader, TheLeftSideBar, TheMainContent },

  setup() {
    provide("isShowStar", false);
  },
};
</script>
