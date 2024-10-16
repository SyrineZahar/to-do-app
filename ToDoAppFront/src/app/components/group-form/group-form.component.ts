import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupEntity } from 'src/app/classe/GroupEntity'; // Import de la classe GroupEntity
import { GroupService } from 'src/app/service/group.service'; // Import de votre service de groupe

/**
 * Composant pour le formulaire de création/modification de groupe.
 *
 * Ce composant permet à l'utilisateur de créer un nouveau groupe
 * ou de modifier un groupe existant à l'aide d'un formulaire.
 *
 * Les champs du formulaire incluent :
 * - Nom du groupe
 * - Description du groupe
 * - Image de fond
 * - Photo de profil
 */
@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent {
  groupForm!: FormGroup; // Formulaire réactif pour le groupe
  backgroundImageFile: File | null = null; // Fichier d'image de fond
  profilePictureFile: File | null = null; // Fichier d'image de profil
  backgroundImageUrl: string | null = null; // URL pour afficher l'image de fond
  profilePictureUrl: string | null = null; // URL pour afficher la photo de profil

  /**
   * Constructeur du composant.
   * 
   * @param fb - FormBuilder pour créer des formulaires réactifs.
   * @param groupService - Service pour gérer les groupes.
   * @param router - Router pour la navigation entre les pages.
   */
  constructor(
    private fb: FormBuilder,
    private groupService: GroupService, 
    private router: Router
  ) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Crée un formulaire vide à l'aide de la méthode createEmptyForm.
   */
  ngOnInit(): void {
    this.createEmptyForm();
  }

  /**
   * Crée un formulaire réactif vide avec des contrôles pour
   * le nom, la description, l'image de fond et la photo de profil.
   */
  private createEmptyForm(): void {
    this.groupForm = this.fb.group({
        nom: ['', Validators.required], // Champ nom obligatoire
        description: ['', Validators.required], // Champ description obligatoire
        backgroundImage: [null], // Champ d'image de fond (optionnel)
        profilePicture: [null], // Champ d'image de profil (optionnel)
    });
  }



  onBackgroundImageChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast explicite de event.target
    if (input.files && input.files.length > 0) {
        this.backgroundImageFile = input.files[0];
        
        // Mettre à jour le FormGroup avec le fichier
        this.groupForm.patchValue({
            backgroundImage: this.backgroundImageFile // Mettre à jour le contrôle backgroundImage
        });

        // Utiliser FileReader pour afficher l'image
        const reader = new FileReader();
        reader.onload = () => {
            this.backgroundImageUrl = reader.result as string; // Stocker le chemin de l'image
        };
        reader.readAsDataURL(this.backgroundImageFile); // Lire l'image comme une URL de données
    } else {
        this.backgroundImageFile = null;
        this.backgroundImageUrl = null; // Réinitialiser si aucun fichier n'est sélectionné
        this.groupForm.patchValue({
            backgroundImage: null // Réinitialiser le contrôle backgroundImage
        });
    }
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast explicite ici
    if (input.files && input.files.length > 0) {
        this.profilePictureFile = input.files[0];
        
        // Mettre à jour le FormGroup avec le fichier
        this.groupForm.patchValue({
            profilePicture: this.profilePictureFile // Mettre à jour le contrôle profilePicture
        });

        // Utiliser FileReader pour afficher l'image
        const reader = new FileReader();
        reader.onload = () => {
            this.profilePictureUrl = reader.result as string; // Stocker le chemin de l'image
        };
        reader.readAsDataURL(this.profilePictureFile); // Lire l'image comme une URL de données
    } else {
        this.profilePictureFile = null;
        this.profilePictureUrl = null; // Réinitialiser si aucun fichier n'est sélectionné
        this.groupForm.patchValue({
            profilePicture: null // Réinitialiser le contrôle profilePicture
        });
    }
  }

  

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Vérifie si le formulaire est valide et, si oui, crée un nouveau groupe
   * avec les données du formulaire et appelle le service pour l'ajouter.
   */
  onSubmit(): void {
    console.log('Valeurs du formulaire:', this.groupForm.value);
  
    // Vérification des champs de formulaire
    if (this.groupForm.valid && this.backgroundImageFile && this.profilePictureFile) {
        const groupData = new GroupEntity(
            this.backgroundImageFile.name, // Utiliser le nom du fichier
            this.profilePictureFile.name, // Utiliser le nom du fichier
            this.groupForm.value.nom,
            this.groupForm.value.description,
        );

        console.log('Données du groupe à envoyer:', groupData);

        this.groupService.addGroup(groupData).subscribe({
            next: () => {
                console.log('Groupe ajouté avec succès');
                this.router.navigate([""]); // Redirection vers la liste des groupes
            },
            error: (err) => {
                console.error('Erreur lors de l\'ajout du groupe:', err);
            }
        });
    } else {
        console.error('Le formulaire est invalide ou les fichiers sont manquants.');
        alert('Veuillez remplir tous les champs et sélectionner les images.');
    }
  }


  

  /**
   * Méthode pour naviguer vers la liste des groupes.
   * Cette méthode est appelée lors de l'annulation.
   */
  navigateToGroups(): void {
    this.router.navigate([""]); // Redirection vers la liste des groupes
  }
}
