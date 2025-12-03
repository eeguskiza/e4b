<script setup>
import { computed, reactive, ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

const db = useFirestore()
const contactsRef = collection(db, 'contacts')
const contactsQuery = query(contactsRef, orderBy('createdAt', 'desc'))
const contacts = useCollection(contactsQuery)

const form = reactive({
  name: '',
  email: '',
  phone: '',
})

const status = ref({ type: '', message: '' })
const loading = ref(false)

const contactCount = computed(() => contacts.value?.length || 0)

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
}

const isValidEmail = (value) =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim())
const isValidPhone = (value) =>
  /^\+?\d[\d\s-]{6,}$/.test(value.trim())

const validate = () => {
  if (!form.name.trim()) return 'Introduce un nombre.'
  if (!form.email.trim()) return 'Introduce un email.'
  if (!isValidEmail(form.email)) return 'Email no válido.'
  if (!form.phone.trim()) return 'Introduce un teléfono.'
  if (!isValidPhone(form.phone)) return 'Teléfono no válido.'
  return ''
}

const addContact = async () => {
  status.value = { type: '', message: '' }
  const error = validate()
  if (error) {
    status.value = { type: 'error', message: error }
    return
  }

  loading.value = true
  try {
    await addDoc(contactsRef, {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      createdAt: serverTimestamp(),
    })
    resetForm()
    status.value = { type: 'success', message: 'Contacto guardado.' }
  } catch (err) {
    status.value = { type: 'error', message: 'No se pudo guardar. Intenta de nuevo.' }
  } finally {
    loading.value = false
  }
}

const deleteContact = async (id) => {
  if (!id) return
  status.value = { type: '', message: '' }
  try {
    await deleteDoc(doc(contactsRef, id))
    status.value = { type: 'success', message: 'Contacto eliminado.' }
  } catch (err) {
    status.value = { type: 'error', message: 'No se pudo borrar. Intenta de nuevo.' }
  }
}
</script>

<template>
  <main class="page" itemscope itemtype="https://schema.org/ContactPage">
    <header class="hero" role="banner">
      <p class="kicker">Tu gente, a mano</p>
      <h1 itemprop="name">Agenda de contactos</h1>
      <p class="lede">
        Guarda nombres, correos y teléfonos en un sitio sencillo. Los datos quedan en
        tu Firestore y puedes añadir o borrar sin recargar.
      </p>
      <div class="stat-card" aria-label="Contactos guardados">
        <span>Total guardados</span>
        <strong>{{ contactCount }}</strong>
      </div>
    </header>

    <section class="layout" vocab="https://schema.org/" typeof="ContactPage">
      <article class="panel form-panel" itemprop="mainEntity" itemscope itemtype="https://schema.org/ContactPoint">
        <h2>Nuevo contacto</h2>
        <form class="contact-form" @submit.prevent="addContact" novalidate>
          <label>
            <span>Nombre</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              required
              autocomplete="name"
              itemprop="name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              v-model="form.email"
              type="email"
              name="email"
              required
              autocomplete="email"
              itemprop="email"
            />
          </label>
          <label>
            <span>Teléfono</span>
            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              required
              autocomplete="tel"
              itemprop="telephone"
            />
          </label>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Guardando...' : 'Guardar contacto' }}
          </button>
        </form>

        <p v-if="status.type === 'success'" class="alert success" role="status">
          {{ status.message }}
        </p>
        <p v-if="status.type === 'error'" class="alert error" role="alert">
          {{ status.message }}
        </p>
      </article>

      <article class="panel list-panel">
        <div class="panel-header">
          <h2 itemprop="about">Contactos</h2>
          <span class="pill">{{ contactCount }}</span>
        </div>

        <div
          v-if="!contacts || contacts.length === 0"
          class="empty"
          role="status"
        >
          Aún no hay contactos. Añade el primero.
        </div>

        <ul class="contact-list">
          <li
            v-for="contact in contacts"
            :key="contact.id"
            itemscope
            itemprop="contactPoint"
            itemtype="https://schema.org/ContactPoint"
          >
            <div class="contact-meta">
              <p class="name" itemprop="name">{{ contact.name }}</p>
              <p class="email">
                <a :href="`mailto:${contact.email}`" itemprop="email">
                  {{ contact.email }}
                </a>
              </p>
              <p class="phone">
                <a :href="`tel:${contact.phone}`" itemprop="telephone">
                  {{ contact.phone }}
                </a>
              </p>
            </div>
            <button
              type="button"
              class="ghost"
              @click="deleteContact(contact.id)"
              :aria-label="`Borrar contacto ${contact.name}`"
            >
              Borrar
            </button>
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>
