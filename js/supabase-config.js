// Configuración de Supabase
const SUPABASE_URL = 'https://bbpuuwgalkzyfawhjsqt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicHV1d2dhbGt6eWZhd2hqc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDM5MjksImV4cCI6MjA4ODY3OTkyOX0.yjjqLKUatkiVpfvDJuk3lqLdj28nUSk7OmJbzdNUC2U';

// Inicializar el cliente
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
