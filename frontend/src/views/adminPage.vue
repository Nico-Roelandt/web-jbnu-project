<template>
  <div class="page">
    <h2 class="page-title">Admin Panel</h2>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="switchTab(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-container">
      <p class="loading-text">Loading...</p>
    </div>

    <!-- Table -->
    <div v-else class="admin-table-container">
      <div v-for="tab in tabs" :key="tab" v-show="activeTab === tab">
        <div class="admin-table-header">
          <div class="table-name">{{ tab }}</div>
          <div class="table-actions">
            <input v-model="newItem[tab]" placeholder="Add new..." />
            <img :src="getImage('add')" style="width:26px;" class="icon" @click="addItem(tab)" />
          </div>
        </div>

        <div class="admin-table">
          <div
            class="admin-row"
            v-for="item in items[tab]"
            :key="item.id"
          >
            <div class="row-name">
              <input
                v-if="editItem.id === item.id && editItem.tab === tab"
                v-model="editItem.value"
              />
              <span v-else>{{ getItemName(item, tab) }}</span>
            </div>
            <div class="row-actions">
              <img
                :src="editItem.id === item.id && editItem.tab === tab ? getImage('save') : getImage('modify')"
                class="icon"
                @click="editItem.id === item.id && editItem.tab === tab ? saveItem(tab, item.id) : startEdit(tab, item)"
              />
              <img
                :src="getImage('delete')"
                class="icon"
                @click="deleteItem(tab, item.id)"
              />
            </div>
          </div>
        </div>

        <!-- Pagination only for Users and Words -->
        <div v-if="tab === 'User' || tab === 'Word'" class="pagination">
          <button @click="prevPage" :disabled="currentPage[tab] === 1">Prev</button>
          <span>Page {{ currentPage[tab] }} / {{ totalPages[tab] }}</span>
          <button @click="nextPage" :disabled="currentPage[tab] === totalPages[tab]">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { 
  getUsers, getWords, getDifficulties, getModes,
  updateItem, deleteItemById, addItemByName
} from "@/controllers/adminController";

const tabs = ["Word", "Difficulty", "Mode", "User"];
const activeTab = ref("Word");
const isLoading = ref(true);

const items = ref({ Word: [], Difficulty: [], Mode: [], User: [] });
const totalPages = ref({ Word: 1, Difficulty: 1, Mode: 1, User: 1 });
const currentPage = ref({ Word: 1, Difficulty: 1, Mode: 1, User: 1 });
const newItem = ref({ Word: "", Difficulty: "", Mode: "", User: "" });
const editItem = ref({ id: null, tab: null, value: "" });

const route = useRoute();
const router = useRouter();

/** Get display value depending on tab */
const getItemName = (item, tab) => {
  switch(tab) {
    case "Word": return item.word;
    case "Difficulty": return item.difficulty_label;
    case "Mode": return item.mode_label;
    case "User": return item.username;
  }
};

/** Get icon path */
const getImage = (type) => `/src/assets/images/${type}.png`;

/** Fetch items depending on tab */
const fetchItems = async (tab = activeTab.value) => {
  isLoading.value = true;
  try {
    if(tab === "User") {
      const res = await getUsers(currentPage.value[tab]);
      items.value.User = res.items;
      totalPages.value.User = res.totalPages;
    } else if(tab === "Word") {
      const res = await getWords(currentPage.value.Word);
      items.value.Word = res.items;
      totalPages.value.Word = res.totalPages;
    } else if(tab === "Difficulty") {
      items.value.Difficulty = await getDifficulties();
    } else if(tab === "Mode") {
      items.value.Mode = await getModes();
    }
    // Update URL with tab and page
    router.replace({ query: { tab, page: currentPage.value[tab] } });
  } catch(err) {
    console.error("Failed to fetch admin data:", err);
  } finally {
    isLoading.value = false;
  }
};

/** Switch tab */
const switchTab = (tab) => {
  activeTab.value = tab;
  const page = parseInt(route.query.page) || 1;
  currentPage.value[tab] = page;
  fetchItems(tab);
};

/** Pagination helpers */
const prevPage = () => {
  const tab = activeTab.value;
  if(currentPage.value[tab] > 1){
    currentPage.value[tab]--;
    fetchItems(tab);
  }
};
const nextPage = () => {
  const tab = activeTab.value;
  if(currentPage.value[tab] < totalPages.value[tab]){
    currentPage.value[tab]++;
    fetchItems(tab);
  }
};

/** Start editing an item */
const startEdit = (tab, item) => {
  editItem.value = { id: item.id, tab, value: getItemName(item, tab) };
};

/** Save edited item */
const saveItem = async (tab, id) => {
  try {
    await updateItem(tab, id, editItem.value.value);
    editItem.value = { id: null, tab: null, value: "" };
    fetchItems(tab);
  } catch(err){
    console.error("Failed to save item:", err);
  }
};

/** Delete an item */
const deleteItem = async (tab, id) => {
  try {
    await deleteItemById(tab, id);
    fetchItems(tab);
  } catch(err){
    console.error("Failed to delete item:", err);
  }
};

/** Add a new item */
const addItem = async (tab) => {
  try {
    if(!newItem.value[tab]) return;
    await addItemByName(tab, newItem.value[tab]);
    newItem.value[tab] = "";
    fetchItems(tab);
  } catch(err){
    console.error("Failed to add item:", err);
  }
};

// Initialize page and tab from URL
onMounted(() => {
  const tab = route.query.tab || "Word";
  const page = parseInt(route.query.page) || 1;
  activeTab.value = tab;
  currentPage.value[tab] = page;
  fetchItems(tab);
});
</script>

<style scoped>
@import "@/assets/css/admin.css";
</style>
